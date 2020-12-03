<script>
export default {
  middleware ({ redirect, route }) {
    if (!route.params.category) {
      return redirect({
        name: `${route.name}-category`,
        params: { category: '123' }
      })
    }
  }
}
</script>
